package controller;
import db.JdbcConnection;
import db.MetingRepository;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/Controller")
public class Controller extends HttpServlet {
    private MetingRepository model = new MetingRepository();
    private ControllerFactory controllerFactory = new ControllerFactory();



    public Controller() {
        super();
    }

    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {

        processRequest(request, response);
    }

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) throws ServletException, IOException {

        processRequest(request, response);
    }

    protected void processRequest(HttpServletRequest request,
                                  HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        String destination = "index.jsp";
        if (action != null) {
            RequestHandler handler;
            try {
                handler = controllerFactory.getController(action, model);
                destination = handler.handleRequest(request, response);
            }
            catch (Exception exc) {
                List<String> errors = new ArrayList<String>();
                errors.add(exc.getMessage());
                request.setAttribute("errors", errors);
                destination="index.jsp";
            }
        }
        if(!(destination==null)){
            RequestDispatcher view = request.getRequestDispatcher(destination);
            view.forward(request, response);
        }

    }
}
