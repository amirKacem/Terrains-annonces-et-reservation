<?php

namespace App\Http\Controllers;

use App\Models\Terrain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TerrainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $terrains = Terrain::all();
        return response()->json($terrains);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        
        if($request->hasFile('image')){
         
            $completeFileName = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($completeFileName,PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = $fileName.'_'.rand().'_'.time().'.'.$extension; 
             $request->file('image')->storeAs('public/terrains',$imageName);
            $path = "storage/terrains/".$imageName;
        }
        $user = Auth::user();
        Terrain::create([
            'nom'=> $request->nom,
            'title'=>$request->title,
            'description'=> $request->description,
            'largeur'=> $request->largeur,
            'longueur'=>$request->longueur,
            'image'=>$path,
            'user_id'=> $user->id
            
        ]);
        return ['status'=>true,'message'=>'le terrain a été ajouté'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $annonce = Terrain::findOrFail($id);
        return response()->json($annonce);  
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   
     
        $terrain = Terrain::findOrFail($id);
        $user_id = Auth::user()->id;
        if($user_id==$terrain->user_id){
            $data = [
                'nom'=> $request->nom,
                'title'=>$request->title,
                'description'=> $request->description,
                'largeur'=> $request->largeur,
                'longueur'=>$request->longueur,
            ];
        if($request->hasFile('image')){
         
            $completeFileName = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($completeFileName,PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = $fileName.'_'.rand().'_'.time().'.'.$extension; 
             $request->file('image')->storeAs('public/terrains',$imageName);
            $path = "storage/terrains/".$imageName;
            $data['image']= $path;
        }
        $terrain->update($data);
        return ['status'=>true,'message'=>'le terrain a été mis a jour'];
        }else{
            return response()->json(['message' => 'Unauthorized.'], 401); 
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {   

        $user_id = Auth::user()->id;
      
        $terrain = Terrain::find($id);
        if($user_id==$terrain->user_id){
            $terrain->delete();
            return response()->json(['message'=>"le terrain a été supprimé"]);
        }else{
            return response()->json(['message' => 'Unauthorized.'], 401);
        }
    
    }
}
