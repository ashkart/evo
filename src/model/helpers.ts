import { Point } from "./point";
import { World } from "./world";

const directionsMovingMap = [
  'leftOne',
  'rightOne',
  'upOne',
  'downOne',
  'leftDownOne',
  'leftUpOne',
  'rightDownOne',
  'rightUpOne',
];

const getRandomInt = (max: number, min: number = 0) : number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const newPointByDirectionCode = (position: Point, directionCode: number) : Point => {
  let newX: number = position.x;
  let newY: number = position.y;

  switch (directionCode) {
    case 0:
      newX--;
      break;

    case 1:
      newX++;
      break;

    case 2: 
      newY--;
      break;

    case 3: 
      newY++;
      break;

    case 4:
      newX--;
      newY++;
      break;

    case 5:
      newX++;
      newY++;
      break;
    
    case 6:
      newX--;
      newY--;
      break;
  }

  return new Point(newX, newY);
}

export const getRandomFreePointAround = (pos: Point, world: World) : Point => {
  const memoizedPointsFn = getPointsAround();

  const pointsAround = memoizedPointsFn(pos);

  let freePoint;

  do {
    const index = getRandomInt(pointsAround.length - 1);
    freePoint = pointsAround[index];
    
    if (world.isEmptyPoint(freePoint)) {
      return freePoint;
    }

    pointsAround.splice(index, 1);
  } while (pointsAround.length > 0)

  return pos;
};

const getPointsAround = () : (pos: Point) => Point[] => {
  const possiblePoints: Record<string, Point[]> = {};

  return (position: Point) => {
    const cacheKey = `${position.x}_${position.y}`;

    if (possiblePoints[cacheKey] === undefined) {
      possiblePoints[cacheKey] = directionsMovingMap.map((name, code) => newPointByDirectionCode(position, code));
    }

    return possiblePoints[cacheKey];
  };
}
