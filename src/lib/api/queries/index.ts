import { _getAllTeachers } from './getAllTeachers';
import { _getUserRms } from './getUserRms';
import { _getAllExercises } from './getAllExercises';
import { _getExercise } from './getExercise';
import { _getUserStrengthRm } from './getUserStrengthRm';

export const query = {
  getAllTeachers: _getAllTeachers,
  getUserRms: _getUserRms,
  getAllExercises: _getAllExercises,
  getExercise: _getExercise,
  getUserStrengthRm: _getUserStrengthRm,
};
