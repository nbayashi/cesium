import Cartesian2 from "../Core/Cartesian2.js";
import Color from "../Core/Color.js";
import Frozen from "../Core/Frozen.js";
import defined from "../Core/defined.js";
import Event from "../Core/Event.js";
import JulianDate from "../Core/JulianDate.js";
import createPropertyDescriptor from "./createPropertyDescriptor.js";
import Property from "./Property.js";

const defaultColor = Color.WHITE;
const defaultCellAlpha = 0.1;
const defaultLineCount = new Cartesian2(8, 8);
const defaultLineOffset = new Cartesian2(0, 0);
const defaultLineThickness = new Cartesian2(1, 1);

/**
 * A {@link MaterialProperty} that maps to grid {@link Material} uniforms.
 * @alias GridMaterialProperty
 *
 * @param {object} [options] Object with the following properties:
 * @param {Property|Color} [options.color=Color.WHITE] A Property specifying the grid {@link Color}.
 * @param {Property|number} [options.cellAlpha=0.1] A numeric Property specifying cell alpha values.
 * @param {Property|Cartesian2} [options.lineCount=new Cartesian2(8, 8)] A {@link Cartesian2} Property specifying the number of grid lines along each axis.
 * @param {Property|Cartesian2} [options.lineThickness=new Cartesian2(1.0, 1.0)] A {@link Cartesian2} Property specifying the thickness of grid lines along each axis.
 * @param {Property|Cartesian2} [options.lineOffset=new Cartesian2(0.0, 0.0)] A {@link Cartesian2} Property specifying starting offset of grid lines along each axis.
 *
 * @constructor
 */
function GridMaterialProperty(options) {
  options = options ?? Frozen.EMPTY_OBJECT;

  this._definitionChanged = new Event();
  this._color = undefined;
  this._colorSubscription = undefined;
  this._cellAlpha = undefined;
  this._cellAlphaSubscription = undefined;
  this._lineCount = undefined;
  this._lineCountSubscription = undefined;
  this._lineThickness = undefined;
  this._lineThicknessSubscription = undefined;
  this._lineOffset = undefined;
  this._lineOffsetSubscription = undefined;

  this.color = options.color;
  this.cellAlpha = options.cellAlpha;
  this.lineCount = options.lineCount;
  this.lineThickness = options.lineThickness;
  this.lineOffset = options.lineOffset;
}

Object.defineProperties(GridMaterialProperty.prototype, {
  /**
   * Gets a value indicating if this property is constant.  A property is considered
   * constant if getValue always returns the same result for the current definition.
   * @memberof GridMaterialProperty.prototype
   *
   * @type {boolean}
   * @readonly
   */
  isConstant: {
    get: function () {
      return (
        Property.isConstant(this._color) &&
        Property.isConstant(this._cellAlpha) &&
        Property.isConstant(this._lineCount) &&
        Property.isConstant(this._lineThickness) &&
        Property.isConstant(this._lineOffset)
      );
    },
  },

  /**
   * Gets the event that is raised whenever the definition of this property changes.
   * The definition is considered to have changed if a call to getValue would return
   * a different result for the same time.
   * @memberof GridMaterialProperty.prototype
   *
   * @type {Event}
   * @readonly
   */
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },

  /**
   * Gets or sets the Property specifying the grid {@link Color}.
   * @memberof GridMaterialProperty.prototype
   * @type {Property|undefined}
   * @default Color.WHITE
   */
  color: createPropertyDescriptor("color"),

  /**
   * Gets or sets the numeric Property specifying cell alpha values.
   * @memberof GridMaterialProperty.prototype
   * @type {Property|undefined}
   * @default 0.1
   */
  cellAlpha: createPropertyDescriptor("cellAlpha"),

  /**
   * Gets or sets the {@link Cartesian2} Property specifying the number of grid lines along each axis.
   * @memberof GridMaterialProperty.prototype
   * @type {Property|undefined}
   * @default new Cartesian2(8.0, 8.0)
   */
  lineCount: createPropertyDescriptor("lineCount"),

  /**
   * Gets or sets the {@link Cartesian2} Property specifying the thickness of grid lines along each axis.
   * @memberof GridMaterialProperty.prototype
   * @type {Property|undefined}
   * @default new Cartesian2(1.0, 1.0)
   */
  lineThickness: createPropertyDescriptor("lineThickness"),

  /**
   * Gets or sets the {@link Cartesian2} Property specifying the starting offset of grid lines along each axis.
   * @memberof GridMaterialProperty.prototype
   * @type {Property|undefined}
   * @default new Cartesian2(0.0, 0.0)
   */
  lineOffset: createPropertyDescriptor("lineOffset"),
});

/**
 * Gets the {@link Material} type at the provided time.
 *
 * @param {JulianDate} time The time for which to retrieve the type.
 * @returns {string} The type of material.
 */
GridMaterialProperty.prototype.getType = function (time) {
  return "Grid";
};

const timeScratch = new JulianDate();

/**
 * Gets the value of the property at the provided time.
 *
 * @param {JulianDate} [time=JulianDate.now()] The time for which to retrieve the value. If omitted, the current system time is used.
 * @param {object} [result] The object to store the value into, if omitted, a new instance is created and returned.
 * @returns {object} The modified result parameter or a new instance if the result parameter was not supplied.
 */
GridMaterialProperty.prototype.getValue = function (time, result) {
  if (!defined(time)) {
    time = JulianDate.now(timeScratch);
  }
  if (!defined(result)) {
    result = {};
  }
  result.color = Property.getValueOrClonedDefault(
    this._color,
    time,
    defaultColor,
    result.color,
  );
  result.cellAlpha = Property.getValueOrDefault(
    this._cellAlpha,
    time,
    defaultCellAlpha,
  );
  result.lineCount = Property.getValueOrClonedDefault(
    this._lineCount,
    time,
    defaultLineCount,
    result.lineCount,
  );
  result.lineThickness = Property.getValueOrClonedDefault(
    this._lineThickness,
    time,
    defaultLineThickness,
    result.lineThickness,
  );
  result.lineOffset = Property.getValueOrClonedDefault(
    this._lineOffset,
    time,
    defaultLineOffset,
    result.lineOffset,
  );
  return result;
};

/**
 * Compares this property to the provided property and returns
 * <code>true</code> if they are equal, <code>false</code> otherwise.
 *
 * @param {Property} [other] The other property.
 * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
 */
GridMaterialProperty.prototype.equals = function (other) {
  return (
    this === other || //
    (other instanceof GridMaterialProperty && //
      Property.equals(this._color, other._color) && //
      Property.equals(this._cellAlpha, other._cellAlpha) && //
      Property.equals(this._lineCount, other._lineCount) && //
      Property.equals(this._lineThickness, other._lineThickness) && //
      Property.equals(this._lineOffset, other._lineOffset))
  );
};
export default GridMaterialProperty;
