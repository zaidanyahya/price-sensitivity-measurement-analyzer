/**
 * Represents a coordinate in 2D.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * Represents a line consist by two point coordinate in 2D.
 */
export type Line2P = {
  p1: Point;
  p2: Point;
};

/**
 * Represents a line consist by many points.
 */
export type Line = Point[];

/**
 * Swaps the order of points in a Line2P if the x-coordinate of the first point is
 * greater than the second point.
 * @param {Line2P} line - The line segment.
 * @returns {Line2P} The line segment with points swapped if necessary.
 */

export const sortPointByX = (line: Line2P): Line2P => {
  if (line.p1.x > line.p2.x) {
    const p = line.p1;
    line.p1 = line.p2;
    line.p2 = p;
  }
  return line;
};

/**
 * Converts arrays of x and y coordinates into a Line.
 * @param {number[]} xPoints - Array of x coordinates.
 * @param {number[]} yPoints - Array of y coordinates.
 * @returns {Line} A Line converted from arrays
 */
export const arrayToLine = (xPoints: number[], yPoints: number[]): Line => {
  if (xPoints.length !== yPoints.length) {
    return [];
  }
  const line: Line = [];
  for (let i = 0; i < xPoints.length; i++) {
    const x = xPoints[i];
    const y = yPoints[i];
    line.push({ x, y });
  }
  return line;
};

/**
 * Calculates the gradient (slope) of a Line2P.
 * @param {Line2P} line - The line segment.
 * @returns {number} The gradient of the line.
 */
export const gradient = (line: Line2P): number => {
  const { p1, p2 } = line;
  return (p1.y - p2.y) / (p1.x - p2.x);
};

/**
 * Calculates the y-intercept of a Line2P given an optional slope.
 * @param {Line2P} line - The line segment.
 * @param {number} [slopes] - Optional slope for calculation.
 * @returns {number} The y-intercept of the line.
 */
export const yIntercept = (line: Line2P, slopes?: number): number => {
  let m: number;
  if (typeof slopes === "undefined") {
    m = gradient(line);
  } else {
    m = slopes;
  }

  return line.p1.y - m * line.p1.x;
};

/**
 * Calculates the intersection point of two Line2P segments.
 * @param {Line2P} line1 - The first line segment.
 * @param {Line2P} line2 - The second line segment.
 * @returns {[boolean, Point]} A tuple indicating whether the lines intersect and the intersection point.
 */
export const intersectionPoint = (
  line1: Line2P,
  line2: Line2P,
): [boolean, Point] => {
  // Find slopes
  const m1 = gradient(line1);
  const m2 = gradient(line2);

  // Find y-intercepts
  const b1 = yIntercept(line1, m1);
  const b2 = yIntercept(line2, m2);

  // Check if lines are parallel
  if (m1 === m2) {
    return [false, { x: 0, y: 0 }];
  }

  // Intersection point
  const x = (b2 - b1) / (m1 - m2);
  const y = m1 * x + b1;

  return [true, { x, y }];
};

/**
 * Checks if a point lies on a Line2P segment.
 * @param {Line2P} line - The line segment.
 * @param {Point} point - The point to check.
 * @returns {boolean} True if the point lies on the line segment, false otherwise.
 */
export const onSegment = (line: Line2P, point: Point): boolean => {
  line = sortPointByX(line);
  const { x, y } = point;
  const m = gradient(line);

  const xOnSegment = x >= line.p1.x && x <= line.p2.x;

  let yOnSegment;
  if (m >= 0) {
    yOnSegment = y >= line.p1.y && y <= line.p2.y;
  } else {
    yOnSegment = y >= line.p2.y && y <= line.p1.y;
  }

  return xOnSegment && yOnSegment;
};

/**
 * Calculates the intersection point of two Line2P segments considering only the segments.
 * @param {Line2P} line1 - The first line segment.
 * @param {Line2P} line2 - The second line segment.
 * @returns {[boolean, Point]} A tuple indicating whether the segments intersect and the intersection point.
 */
export const intersectOnSegment = (
  line1: Line2P,
  line2: Line2P,
): [boolean, Point] => {
  const [intersect, point] = intersectionPoint(line1, line2);
  if (intersect) {
    if (onSegment(line1, point) && onSegment(line2, point)) {
      return [true, point];
    }
  }
  return [false, { x: 0, y: 0 }];
};

/**
 * Finds the intersection point of two Lines by checking their segments.
 * @param {Line} line1 - The first line.
 * @param {Line} line2 - The second line.
 * @returns {Point} The intersection point if found, otherwise { x: 0, y: 0 }.
 */
export const findIntersectionBySegment = (line1: Line, line2: Line): Point => {
  if (line1.length !== line2.length) {
    return { x: 0, y: 0 };
  }

  for (let i = 0; i < line1.length - 1; i++) {
    const [intersect, point] = intersectOnSegment(
      { p1: line1[i], p2: line1[i + 1] },
      { p1: line2[i], p2: line2[i + 1] },
    );

    if (intersect) {
      return point;
    }
  }

  return { x: 0, y: 0 };
};
