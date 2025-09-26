import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function DeleteAccountDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full justify-start"
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Eliminar Conta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-red-700 text-sm">
            Esta ação não pode ser desfeita. Isto irá eliminar permanentemente a sua conta e remover todos os dados
            associados.
          </p>

          <div className="text-sm text-red-700">
            <p className="font-medium">Os seguintes dados serão eliminados:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Informações do perfil</li>
              <li>Histórico de atividades</li>
              <li>Configurações da conta</li>
              <li>Todos os dados associados</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="flex-1"
          >
            Eliminar Conta Permanentemente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
