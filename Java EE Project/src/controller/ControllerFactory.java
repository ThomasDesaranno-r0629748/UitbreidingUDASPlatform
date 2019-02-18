package controller;

import db.MetingRepository;

public class ControllerFactory {
	
    public RequestHandler getController(String key, MetingRepository model) {
        return createHandler(key, model);
    }
    
	private RequestHandler createHandler(String handlerName, MetingRepository model) {
		RequestHandler handler = null;
		try {
			Class<?> handlerClass = Class.forName("controller."+ handlerName);
			Object handlerObject = handlerClass.newInstance();
			handler = (RequestHandler) handlerObject;
	    	handler.setModel(model);
		} catch (Exception e) {
			throw new RuntimeException("Deze pagina bestaat niet!!!!");
		}
		return handler;
	}


}
