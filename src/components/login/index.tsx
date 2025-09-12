import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Efetue o login para acessar sua conta
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Entre com seu usuário
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="login">Usuário</Label>
          <Input id="login" type="text" placeholder="Usuário" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input
            id="password"
            placeholder="•••••••••••"
            type="password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>
    </form>
  );
}
