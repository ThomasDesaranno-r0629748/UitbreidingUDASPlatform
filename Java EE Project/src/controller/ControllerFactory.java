package controller;

import db.JdbcConnection;
import db.MetingRepository;

public class ControllerFactory {
	
    public RequestHandler getController(String key, MetingRepository model, JdbcConnection connection) {
        return createHandler(key, model, connection);
    }
    
	private RequestHandler createHandler(String handlerName, MetingRepository model, JdbcConnection connection) {
		RequestHandler handler = null;
		try {
			Class<?> handlerClass = Class.forName("controller."+ handlerName);
			Object handlerObject = handlerClass.newInstance();
			handler = (RequestHandler) handlerObject;
	    	handler.setModel(model, connection);
		} catch (Exception e) {
			throw new RuntimeException("Deze pagina bestaat niet!!!!");
		}
		return handler;
	}


}
