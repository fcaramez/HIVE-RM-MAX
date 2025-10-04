import { _loginUser } from './loginUser';
import { _registerStudent } from './registerStudent';
import { _registerTeacher } from './registerTeacher';
import { _getCurrentUser } from './getCurrentUser';
import { _deleteAccount } from './deleteAccount';
import { _signOutUser } from './signOutUser';
import { _editProfile } from './editProfile';

export const auth = {
  loginUser: _loginUser,
  registerStudent: _registerStudent,
  registerTeacher: _registerTeacher,
  getCurrentUser: _getCurrentUser,
  deleteAccount: _deleteAccount,
  signOutUser: _signOutUser,
  editProfile: _editProfile,
};
