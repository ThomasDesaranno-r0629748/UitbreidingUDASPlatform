package controller;


import db.JdbcConnection;
import db.MetingRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.JDBCType;

public abstract class RequestHandler {

    protected MetingRepository localRepo = new MetingRepository();
    protected JdbcConnection connection;

    public abstract String handleRequest (HttpServletRequest request, HttpServletResponse response) throws IOException;

    public void setModel (MetingRepository personService) {
        this.localRepo = personService;
        connection = new JdbcConnection(localRepo);
    }

    public MetingRepository getLocalRepo() {
        return localRepo;
    }

}
