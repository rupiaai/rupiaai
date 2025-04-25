import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username } = await request.json();
    const findExisitingUsername = await userModel.findOne({ username });
    if (findExisitingUsername) {
      return new Response(
        JSON.stringify({
          message: "User name already taken please try another one",
        }),
        {
          status: 409,
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: "Username is available",
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
