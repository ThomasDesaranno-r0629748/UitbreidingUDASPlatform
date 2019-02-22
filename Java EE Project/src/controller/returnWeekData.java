package controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;


public class returnWeekData extends RequestHandler {
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        ArrayList data = this.getLocalRepo().returnWeekData();
        try{
            String json = toJSON(data);
            response.setContentType("application/json");
            response.getWriter().write(json);
        } catch (Exception e){
            e.printStackTrace();
        }
        response.addHeader("Access-Control-Allow-Origin", "*");
        return null;
    }

    @JsonIgnore
    public String toJSON(Object list) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(list);
    }
}