import Cartesian3 from "./Cartesian3.js";
import Check from "./Check.js";
import defined from "./defined.js";
import EllipsoidOutlineGeometry from "./EllipsoidOutlineGeometry.js";

/**
 * A description of the outline of a sphere.
 *
 * @alias SphereOutlineGeometry
 * @constructor
 *
 * @param {object} [options] Object with the following properties:
 * @param {number} [options.radius=1.0] The radius of the sphere.
 * @param {number} [options.stackPartitions=10] The count of stacks for the sphere (1 greater than the number of parallel lines).
 * @param {number} [options.slicePartitions=8] The count of slices for the sphere (Equal to the number of radial lines).
 * @param {number} [options.subdivisions=200] The number of points per line, determining the granularity of the curvature .
 *
 * @exception {DeveloperError} options.stackPartitions must be greater than or equal to one.
 * @exception {DeveloperError} options.slicePartitions must be greater than or equal to zero.
 * @exception {DeveloperError} options.subdivisions must be greater than or equal to zero.
 *
 * @example
 * const sphere = new Cesium.SphereOutlineGeometry({
 *   radius : 100.0,
 *   stackPartitions : 6,
 *   slicePartitions: 5
 * });
 * const geometry = Cesium.SphereOutlineGeometry.createGeometry(sphere);
 */
function SphereOutlineGeometry(options) {
  const radius = options.radius ?? 1.0;
  const radii = new Cartesian3(radius, radius, radius);
  const ellipsoidOptions = {
    radii: radii,
    stackPartitions: options.stackPartitions,
    slicePartitions: options.slicePartitions,
    subdivisions: options.subdivisions,
  };

  this._ellipsoidGeometry = new EllipsoidOutlineGeometry(ellipsoidOptions);
  this._workerName = "createSphereOutlineGeometry";
}

/**
 * The number of elements used to pack the object into an array.
 * @type {number}
 */
SphereOutlineGeometry.packedLength = EllipsoidOutlineGeometry.packedLength;

/**
 * Stores the provided instance into the provided array.
 *
 * @param {SphereOutlineGeometry} value The value to pack.
 * @param {number[]} array The array to pack into.
 * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
 *
 * @returns {number[]} The array that was packed into
 */
SphereOutlineGeometry.pack = function (value, array, startingIndex) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.object("value", value);
  //>>includeEnd('debug');

  return EllipsoidOutlineGeometry.pack(
    value._ellipsoidGeometry,
    array,
    startingIndex,
  );
};

const scratchEllipsoidGeometry = new EllipsoidOutlineGeometry();
const scratchOptions = {
  radius: undefined,
  radii: new Cartesian3(),
  stackPartitions: undefined,
  slicePartitions: undefined,
  subdivisions: undefined,
};

/**
 * Retrieves an instance from a packed array.
 *
 * @param {number[]} array The packed array.
 * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
 * @param {SphereOutlineGeometry} [result] The object into which to store the result.
 * @returns {SphereOutlineGeometry} The modified result parameter or a new SphereOutlineGeometry instance if one was not provided.
 */
SphereOutlineGeometry.unpack = function (array, startingIndex, result) {
  const ellipsoidGeometry = EllipsoidOutlineGeometry.unpack(
    array,
    startingIndex,
    scratchEllipsoidGeometry,
  );
  scratchOptions.stackPartitions = ellipsoidGeometry._stackPartitions;
  scratchOptions.slicePartitions = ellipsoidGeometry._slicePartitions;
  scratchOptions.subdivisions = ellipsoidGeometry._subdivisions;

  if (!defined(result)) {
    scratchOptions.radius = ellipsoidGeometry._radii.x;
    return new SphereOutlineGeometry(scratchOptions);
  }

  Cartesian3.clone(ellipsoidGeometry._radii, scratchOptions.radii);
  result._ellipsoidGeometry = new EllipsoidOutlineGeometry(scratchOptions);
  return result;
};

/**
 * Computes the geometric representation of an outline of a sphere, including its vertices, indices, and a bounding sphere.
 *
 * @param {SphereOutlineGeometry} sphereGeometry A description of the sphere outline.
 * @returns {Geometry|undefined} The computed vertices and indices.
 */
SphereOutlineGeometry.createGeometry = function (sphereGeometry) {
  return EllipsoidOutlineGeometry.createGeometry(
    sphereGeometry._ellipsoidGeometry,
  );
};
export default SphereOutlineGeometry;
