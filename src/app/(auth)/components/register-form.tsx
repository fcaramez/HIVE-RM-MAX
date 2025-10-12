'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { TeacherRegisterForm } from './forms/teacher-register-form';
import { StudentRegisterForm } from './forms/student-register-form';

interface RegisterFormProps {
  teachers: Omit<Teacher, 'password'>[];
}

export function RegisterForm({ teachers }: RegisterFormProps) {
  const [selectedTab, setSelectedTab] = useState<RegisterTab>('student');

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crie uma conta para continuar</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="student"
          value={selectedTab}
        >
          <TabsList className="w-full">
            <TabsTrigger
              value="student"
              className="w-full cursor-pointer"
              onClick={() => setSelectedTab('student')}
            >
              Aluno
            </TabsTrigger>
            <TabsTrigger
              value="teacher"
              className="w-full cursor-pointer"
              onClick={() => setSelectedTab('teacher')}
            >
              Professor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <StudentRegisterForm teachers={teachers} />
          </TabsContent>
          <TabsContent value="teacher">
            <TeacherRegisterForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
