'use client'

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
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function DeleteAccountDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const handleDeleteAccount = async () => {
    if (confirmationText !== 'ELIMINAR') {
      toast.error('Por favor, digite "ELIMINAR" para confirmar')
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch('/api/auth/deleteAccount', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao eliminar conta')
      }

      toast.success('Conta eliminada com sucesso')
      setIsOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Error deleting account:', error)
      toast.error(error instanceof Error ? error.message : 'Erro ao eliminar conta')
    } finally {
      setIsDeleting(false)
    }
  }

  const resetDialog = () => {
    setConfirmationText('')
    setShowConfirmation(false)
    setIsDeleting(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open)
        if (!open) resetDialog()
      }}
    >
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
              <li>Registos de pesos e repetições</li>
              <li>Configurações da conta</li>
              <li>Todos os dados associados</li>
            </ul>
          </div>

          {!showConfirmation ? (
            <div className="pt-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => setShowConfirmation(true)}
              >
                Quero Eliminar a Minha Conta
              </Button>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium text-sm mb-2">Confirmação Final</p>
                <p className="text-red-700 text-sm mb-3">
                  Para confirmar a eliminação da sua conta, digite <strong>ELIMINAR</strong> na caixa abaixo:
                </p>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={e => setConfirmationText(e.target.value)}
                  placeholder="Digite ELIMINAR"
                  className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetDialog}
            >
              Cancelar
            </Button>
          </DialogClose>
          {showConfirmation && (
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDeleteAccount}
              disabled={isDeleting || confirmationText !== 'ELIMINAR'}
            >
              {isDeleting ? 'A Eliminar...' : 'Eliminar Conta Permanentemente'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
