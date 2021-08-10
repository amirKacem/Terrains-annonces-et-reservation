<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $annonces = Annonce::all();
        return response()->json($annonces);
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
             $request->file('image')->storeAs('public/annonces',$imageName);
            $path = "storage/annonces/".$imageName;
        }
        $user = Auth::user();

        if($request->reserved=="false"){
            $reserved = 0;
        }else{
            $reserved=1;
        }
        Annonce::create([
            'title'=>$request->title,
            'description'=> $request->description,
            'start_hour'=> $request->start_hour,
            'end_hour'=>$request->end_hour,
            'image'=>$path,
            'user_id'=> $user->id,
            'terrain_id' => $request->terrain_id,
            'reserved' => $reserved
            
        ]);
        return ['status'=>true,'message'=>'l\'annonce  a été ajouté'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $annonce = Annonce::findOrFail($id);
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
        $annonce = Annonce::findOrFail($id);
        $user_id = Auth::user()->id;
        if($user_id==$annonce->user_id){

            $data = [
                'title'=>$request->title,
                'description'=> $request->description,
                'start_hour'=> $request->start_hour,
                'end_hour'=>$request->end_hour
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
        $annonce->update($data);
        return ['status'=>true,'message'=>'l\'annonce a été mis a jour'];
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
        $annonce = Annonce::find($id);
        $annonce->delete();
        return response()->json(['success'=>"l'annonce a été supprimée"]);
    }

    public function reservation($id){
        $annonce = Annonce::findOrFail($id);
        if($annonce->reserved==0){
            $annonce->reserved = true;
            $annonce->save();
            return response()->json(['message'=> 'le terrain a été réservé']);
        }else{
            return response()->json(['message'=> 'terrain déjà réservé']);
        }
    }

}
