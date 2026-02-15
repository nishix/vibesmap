import { AlertTriangle } from "lucide-react"

interface ErrorStateProps {
    message?: string
}

export function ErrorState({
    message = "エラーが発生しました",
}: ErrorStateProps) {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8">
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <p className="text-lg font-medium text-foreground">{message}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                    しばらく待ってからもう一度お試しください
                </p>
            </div>
        </section>
    )
}
