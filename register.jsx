import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

const validatePassword = (password) => {
  const minLength = /.{6,}/;
  const uppercase = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (!minLength.test(password)) {
    toast({ title: "Password must be at least 6 characters long.", variant: "destructive"});
    return false;
    
  }
  if (!uppercase.test(password)) {
    toast({ title: "Password must contain at least one uppercase letter.", variant: "destructive" });
    return false;
  }
  if (!number.test(password)) {
    toast({ title: "Password must contain at least one number.", variant: "destructive" });
    return false;
  }
  if (!specialChar.test(password)) {
    toast({ title: "Password must contain at least one special character.", variant: "destructive" });
    return false;
  }

  return true;
};




  function onSubmit(event) {
  event.preventDefault();

  if (!validatePassword(formData.password)) return; 

  dispatch(registerUser(formData)).then((data) => {
    if (data?.payload?.success) {
      toast({ title: data?.payload?.message });
      navigate("/auth/login");
    } else {
      toast({
        title: data?.payload?.message,
        variant: "destructive",
      });
    }
  });
}

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
