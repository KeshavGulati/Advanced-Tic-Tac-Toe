import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from 'react-toastify';
// import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  
  const navigate = useNavigate();
  
  const handleSubmit = async (fullname: String,
                              username: String,
                              email: String,
                              password: String,
                              confirmPassword: String,
                            ) => {

    const firstname = fullname.split(" ")[0];
    const lastname = fullname.split(" ")[1];

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, username, email, password, confirmPassword })

      });

      const data = await response.json();
      if (response.ok) {
        toast.success("User signed up successfully.");
        console.log(`data.message = ${data.message}\ndata.database = ${JSON.stringify(data.database)}`);
        navigate('/Login');

      } else {
        toast.error(data.message);

      }

    } catch {
      console.error("Something went wrong. Please try again later.");

    }

  }

  const nameInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                required 
                ref={nameInput} />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input 
                id="username" 
                type="text" 
                placeholder="johndoe1" 
                required 
                ref={usernameInput} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                ref={emailInput}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required ref={passwordInput} />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required ref={confirmPasswordInput} />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit"
                  onClick={(e) => {
                    e.preventDefault(); 
                    const fullname = nameInput.current?.value;
                    const password = passwordInput.current?.value;
                    const email = emailInput.current?.value;
                    const confirmPassword = confirmPasswordInput.current?.value;
                    if (!fullname || !password || !email || !confirmPassword) {
                      return;

                    } else {
                      handleSubmit(
                        nameInput.current!.value,
                        usernameInput.current!.value,
                        emailInput.current!.value,
                        passwordInput.current!.value,
                        confirmPasswordInput.current!.value,
                      )

                    }
                  
                  }}
                >Create Account</Button>
                
                {/* {<Button variant="outline" type="button">
                  Sign up with Google
                </Button>} */}

                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
