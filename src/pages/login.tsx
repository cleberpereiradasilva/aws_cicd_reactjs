import { Truck } from "lucide-react";

import { LoginForm } from "@/components/login";

export function LoginPage() {
  return (
    <div className="grid min-h-svh p-30">
      <div className="grid min-h-full lg:grid-cols-2 border-2 rounded-lg overflow-hidden">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <Truck className="size-4" />
              </div>
              SSG
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>

        <div
          className="relative hidden lg:block bg-center bg-cover"
          style={{
            backgroundImage: "url('/assets/login-image.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
        />
      </div>
    </div>
  );
}
