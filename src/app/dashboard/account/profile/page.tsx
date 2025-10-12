import { api } from '@/lib/api';
import EditProfileForm from './components/edit-profile-form';

export default async function ProfilePage() {
  const teachers = await api.query.getAllTeachers();

  return <EditProfileForm teachers={teachers} />;
}
