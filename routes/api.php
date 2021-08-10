<?php

use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\TerrainController;
use App\Http\Controllers\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['cors'])->group(function(){
    Route::post('register',[UserController::class,'register']);
    Route::post('login',[UserController::class,'login']);
});

Route::group(['middleware' => ['cors','auth.jwt']], function () {

    Route::apiResources([
        'annonces' => AnnonceController::class,
        'terrains' => TerrainController::class,
    ]);

    Route::post('terrains/{terrain}',[TerrainController::class,'update']);
    Route::post('annonces/{annonce}',[AnnonceController::class,'update']);

    Route::post('annonces/{id}/reservation',[AnnonceController::class,'reservation']);

    Route::get('user/terrains',[UserController::class,'getUserTerrains']);
    Route::get('user/annonces',[UserController::class,'getUserAnnonces']);
});

