'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const exercises = [
  { value: 'supino', label: 'Supino' },
  { value: 'remada', label: 'Remada' },
  { value: 'deadlift', label: 'Deadlift' },
  { value: 'agachamento', label: 'Agachamento' },
];

export function CreateExerciseDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Exercício</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="exercise-name">Nome do Exercício</Label>
          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value ? exercises.find(exercise => exercise.value === value)?.label : 'Selecione um exercício...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="min-w-full p-0"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Pesquisar exercício..." />
                <CommandList>
                  <CommandEmpty>Nenhum exercício encontrado.</CommandEmpty>
                  <CommandGroup>
                    {exercises.map(exercise => (
                      <CommandItem
                        key={exercise.value}
                        value={exercise.value}
                        onSelect={currentValue => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check className={`mr-2 h-4 w-4 ${value === exercise.value ? 'opacity-100' : 'opacity-0'}`} />
                        {exercise.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="rep-max">Peso (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="ex: 100"
            min="0"
            step="0.5"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="reps">Repetições</Label>
          <Input
            id="reps"
            type="number"
            placeholder="ex: 1, 3, 5, 10"
            min="1"
          />
        </div>

        <Button>Adicionar Exercício</Button>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button
              className="w-full"
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
