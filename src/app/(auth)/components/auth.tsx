import { Button } from "@/components/ui/button";
import {
  GoogleIcon,
  LinkedInIcon,
} from "../../../../public/assets/icons/IconSvg";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-center w-80 gap-4 my-6">
      {/* login integration with google ad linkedin */}
      <Button variant="outline" className="w-full flex gap-4 cursor-pointer">
        <GoogleIcon /> <span>Login with Google</span>
      </Button>

      <Button variant="outline" className="w-full flex gap-4 cursor-pointer">
        <LinkedInIcon /> <span>Login with LinkedIn</span>
      </Button>
    </div>
  );
}
