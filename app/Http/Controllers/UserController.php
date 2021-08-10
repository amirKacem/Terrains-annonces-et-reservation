<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        
        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        return response()->json(['error' => 'L\'adresse Email ou mot de passe incorrect'], 401);
    }

    public function register(SignUpRequest $request){
   
        User::create([
            'email'=>$request->email,
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'password'=> Hash::make($request->password),
            'type'=>$request->type,
            'date_birth'=> $request->date,
            'tel'=> $request->tel
        ]);
  
            
        return $this->login($request);

    }

    public function update(Request $request){
        $request->validate([
            'first_name'=>'required',
            'email'=>'required|unique:users,email,'.Auth::user()->id,
            'last_name'=> 'required'
        ]);
        $data = [
            'email'=>$request->email,
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'date_birth'=> $request->date_birth,
            'tel'=> $request->tel
        ];
        if(!empty($request->password)){
            $password = Hash::make($request->password);
            $data['password'] = $password;
        }
        User::find(Auth::user()->id)->update($data);

        return response()->json(['message'=> 'l\'utilisateur a été mis à jour','status'=>200]);

    }

    public function getAuthUserInfo(){
        $user = Auth::user();
        $data = [
            'email'=>$user->email,
            'first_name'=> $user->first_name,
            'last_name'=> $user->last_name,
            'tel' => $user->tel,
            'date_birth' => $user->date_birth,
            'type'=> $user->type
        ];
        return response()->json($data);
    }

    public function getUserTerrains(){
        $user = Auth::user();
    
        if($user->type=="client"){
            return response()->json(['error' => 'Unauthorized.'], 401);
        }
        $terrains = $user->terrains;
        return response()->json($terrains);
    }

    public function getUserAnnonces(){
        $annonces = Auth::user()->annonces;
        return response()->json($annonces);
    }



     /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
