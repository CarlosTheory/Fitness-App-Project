<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 150);
            $table->string('last_name', 150);
            $table->string('email')->unique();
            $table->string('password',150);
            $table->string('country', 100);
            $table->string('province', 100);
            $table->string('city',100);
            $table->integer('zip_code');
            $table->string('phone', 15)->nullable();
            $table->string('address', 200);
            $table->date('birthday');
            $table->string('gender', 100);
            $table->string('avatar', 160)->nullable();
            $table->boolean('active');
            $table->string('api_token', 100)->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
