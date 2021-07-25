<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   Schema::table('users',function(Blueprint $table){
            $table->dropColumn('name');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('type',['client','club']);
            $table->string('date_birth')->nullable();
            $table->string('tel')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {    Schema::table('users',function(Blueprint $table){
                $table->string('name');
            });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->dropColumn('type');
            $table->dropColumn('date_birth');
            $table->dropColumn('tel');
        });
    }
}
