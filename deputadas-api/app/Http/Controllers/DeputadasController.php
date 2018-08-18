<?php
/**
 * Created by PhpStorm.
 * User: victorximenis
 * Date: 17/08/2018
 * Time: 18:12
 */

namespace App\Http\Controllers;


use App\Deputado;

class DeputadasController extends Controller
{

    public function listarDeputadas() {
        $deputadas = Deputado::with('detalhe')->get();
        return $deputadas;
    }

    public function getDeputada($id) {
        $deputada = Deputado::find($id);
        return $deputada;
    }

}