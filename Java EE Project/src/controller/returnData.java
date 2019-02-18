package controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import domain.Meting;
import jdk.nashorn.internal.runtime.ECMAException;

import java.io.IOException;
import java.util.ArrayList;


public class returnData extends RequestHandler {
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        ArrayList data = this.getLocalRepo().getAll();
        try{
            String json = toJSON(data);
            response.setContentType("application/json");
            response.getWriter().write(json);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @JsonIgnore
    public String toJSON(Object list) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(list);
    }
}