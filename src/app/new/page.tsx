import Link from "next/link";
import { prisma } from "../../db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData){
"use server"
const title = data.get("title").valueOf()
if(typeof title !== "string" || title.length === 0){
  throw new Error("Invalid Title");
}

await prisma.todo.create({data: {
  title, complete: false
}})
redirect("/")
}


export default function Page()  {
  return (
    <>
    <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl"> New Todos</h1>
    </header>
    <form action={createTodo} className="flex gap-2 flex-col">
      <input type="text" name="title" className="border border-slate-300
         text-slate-300 px-2 py-1 rounded bg-transparent
         hover:bg-slate-700 
         focus-within:bg-slate-100 outline-none" />
         <div className="flex justify-end gap-1">
         <Link href={"/"} className="border border-slate-300
         text-slate-300 px-2 py-1 rounded 
         hover:bg-slate-700 
         focus-within:bg-slate-700 outline-none">Cancel</Link>
          <button type="submit" className="border border-slate-300
         text-slate-300 px-2 py-1 rounded 
         hover:bg-slate-700 
         focus-within:bg-slate-700 outline-none">Submit</button>
         </div>
    </form>
    </>
  )
}
