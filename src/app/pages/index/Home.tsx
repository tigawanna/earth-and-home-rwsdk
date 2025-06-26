import { RequestInfo } from "rwsdk/worker";

export function Home({ ctx }: RequestInfo) {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <p className="text-3xl">
        {ctx.user?.username
          ? `You are logged in as user ${ctx.user.username}`
          : "You are not logged in"}
      </p>
    </div>
  );
}
