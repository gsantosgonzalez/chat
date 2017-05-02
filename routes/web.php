<?php

use App\Events\MessagePosted;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/chat', function() {
    return view('chat');
});

Route::get('messages', function() {
    return App\Message::with('user')->get();
});

Route::post('messages', function() {
	//Save the message to the DB
    $user = Auth::user();

    $message = $user->messages()->create([
    	'body' => request()->get('body')
    ]);

    //Announce the event has occurred
    broadcast(new MessagePosted($message, $user))->toOthers();

    return ['status' => 'Ok'];
});

Auth::routes();

Route::get('/home', 'HomeController@index');
