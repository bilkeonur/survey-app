import { Card, Input, Button, Typography } from "@material-tailwind/react";

export function SignUp() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-blue-gray-50/50">
      <Card className="w-4/12 h-1/2">
        <div className="pt-14">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Kayıt Ol</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Kayıt Olmak İçin Email Adresinizi ve Şifrenizi Giriniz</Typography>
          </div>
          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Email Adresiniz
              </Typography>
              <Input
                size="lg"
                placeholder="email@email.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}/>
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Şifreniz
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}/>
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Şifreniz (Tekrar)
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}/>
            </div>
            <Button className="mt-6" fullWidth>
              Kayıt Ol
            </Button>

            <div className="flex items-center justify-between gap-2 mt-6">
              <Typography variant="small" className="font-medium text-gray-900 underline">
                <a href="/auth/sign-in">Giriş Yap</a>
              </Typography>
            </div>

          </form>
        </div>
      </Card>
    </div>
  );
}

export default SignUp;
