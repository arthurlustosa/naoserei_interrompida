<?php
/**
 * Created by PhpStorm.
 * User: victorximenis
 * Date: 17/08/2018
 * Time: 18:06
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Deputado extends Model
{

    protected $table = 'deputados';

    public function detalhe() {
        return $this->hasOne('App\DeputadoDetalhe', 'id_deputado');
    }

    public function gastos() {
        return $this->hasMany('App\Gasto', 'id_deputado');
    }

}