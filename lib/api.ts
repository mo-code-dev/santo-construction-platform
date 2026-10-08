export type ApiResult<T>={success:boolean;data:T|null;message:string;errors:string[]};
export async function api<T>(path:string,init?:RequestInit):Promise<ApiResult<T>>{
 const base=process.env.NEXT_PUBLIC_API_URL||'';
 const res=await fetch(`${base}${path}`,{...init,headers:{'Content-Type':'application/json',...(init?.headers||{})},credentials:'include'});
 const data=await res.json().catch(()=>null);
 if(!res.ok)return {success:false,data:null,message:data?.message||'Request failed',errors:data?.errors||[]};
 return {success:true,data:data?.data??data,message:data?.message||'Success',errors:[]};
}
