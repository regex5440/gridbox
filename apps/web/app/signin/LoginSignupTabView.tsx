import { Card, Tabs as Tab } from "@repo/ui";
import { Login, Signup } from "./Forms";

const { Tabs, TabsList, TabsContent, TabsTrigger } = Tab;

type LoginSignupProps = React.ComponentProps<typeof Login>;

export default function LoginSignup({ ...props }: LoginSignupProps) {
  return (
    <Card.Card className="flex flex-1 justify-center lg:max-w-2xl mx-auto bg-surface py-4 px-8 mt-4 group-has-[&]/signin:mt-0">
      <Tabs defaultValue="login">
        <TabsList className="flex w-fit mx-auto bg-surface-dark">
          <TabsTrigger
            className="data-[state=active]:bg-surface-inverted data-[state=active]:text-regular-inverted rounded-[inherit] text-xl"
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-surface-inverted data-[state=active]:text-regular-inverted rounded-[inherit] text-xl"
            value="signup"
          >
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login {...props} />
        </TabsContent>
        <TabsContent value="signup">
          <Signup {...props} />
        </TabsContent>
      </Tabs>
    </Card.Card>
  );
}
