sap.ui.controller("controllers.CustomerList", {
	onInit : function(){
		var sServiceUrl = "/bat17/evening/Northwind/Northwind.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl);
		this.getView().setModel(oModel);
	},
	
	onItemPress : function(oEvent){
		//every property has get and set method... so getTitle()
		var sSelItem = oEvent.getSource().getTitle(); //eg : ANATR
		
		//oModel is local to onItemPress function
		var oModel = this.getView().getModel();
		
		//get the reference to the model
		var sPath = "/Customers('" + sSelItem + "')";
		
		//get reference to view.
		var oViewRef = this;
		
		//read from Model
		oModel.read(sPath, 
		    {
			success : function(odata){
				//data read from the Odata needs to be set to the Model
				var oModel2 = new sap.ui.model.json.JSONModel(odata);
				
				//bind with the simple form
				var osf = oViewRef.getView().byId("SimpleFormDisplay354");
				
				//setting visibility of simple form to true
				osf.setVisible(true);
				
				osf.setModel(oModel2);
				
				sap.m.MessageToast.show("Data read Success");
			},
			error: function(){ 
				sap.m.MessageToast.show("You fucked up");
			}
		  });
	}
});