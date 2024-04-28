import { Card, Tabs as Tab } from "@repo/ui";
import { Login, Signup } from "./forms";

const { Tabs, TabsList, TabsContent, TabsTrigger } = Tab;

export default function LoginSignup() {
  return (
    <Card.Card className="flex flex-1 justify-center lg:max-w-2xl mx-auto bg-surface py-4 px-8">
      <Tabs defaultValue="login">
        <TabsList className="flex w-fit mx-auto bg-surface-dark">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-surface-inverted data-[state=active]:text-regular-inverted rounded-[inherit] text-xl"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-surface-inverted data-[state=active]:text-regular-inverted rounded-[inherit] text-xl"
          >
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </Card.Card>
  );
}
