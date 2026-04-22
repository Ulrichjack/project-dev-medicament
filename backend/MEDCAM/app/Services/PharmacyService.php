<?php

namespace App\Services;

use App\Models\Pharmacy;

class PharmacyService {

    public function getAllPharmacies(){

        return Pharmacy::paginate(20);
    }

    public function getPharmacyById(int $id){
        return Pharmacy::
        with('stocks.medicament')
        ->findOrFail($id);

    }


}
