<?php
/**
 * Created by PhpStorm.
 * User: victorximenis
 * Date: 17/08/2018
 * Time: 18:07
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Propositura extends Model
{

    protected $table = 'proposituras';

    public function detalhe() {
        return $this->hasOne('App\ProposituraDetalhe', 'id_propositura');
    }

}