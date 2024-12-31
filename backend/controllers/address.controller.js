import Address from "../models/Address";

export async function saveAddress(req, res){
    try {
        const {address} = req.body;
        if(!address|| !address.location || !address.latitude || !address.longitude || !address.addressType){
            return res.status(500).json({message:"please provide full details"});
        }
        const user = req.user
        const newAddress = new Address({
            location: address.location,
            latitude: address.latitude,
            longitude: address.longitude,
            addressType: address.addressType,
            user: user._id
        });
        await newAddress.save();
        return res.status(201).json(newAddress);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"});
    }


}


export async function deleteAddress(req, res){
    try {
        const {id} = req.params;
        const address = await Address.findOneAndDelete({_id:id});
        return res.status(200);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

export async function editAddress(req, res){
    try {
        const {id} = req.params;
        const {address} = req.body;
        if(!address|| !address.location || !address.latitude || !address.longitude || !address.addressType){
            return res.status(500).json({message:"please provide full details"});
        }
        const user = req.user
        const newAddress = {
            location: address.location,
            latitude: address.latitude,
            longitude: address.longitude,
            addressType: address.addressType,
            user: user._id
        };
        const updatedAddress = await Address.findOneAndUpdate({_id:id}, newAddress, {new:true});
        return res.status(200).json(updatedAddress);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"});
        
    }
}