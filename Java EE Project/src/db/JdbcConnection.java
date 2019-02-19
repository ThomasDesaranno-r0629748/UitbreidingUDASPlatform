package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;
import com.microsoft.sqlserver.jdbc.SQLServerDriver;
import domain.Meting;

public class JdbcConnection {
    String url = "jdbc:sqlserver://193.190.58.30;user=snuffelpaal;password=snuffelpaal";
    private MetingRepository repo = new MetingRepository();

    public JdbcConnection(MetingRepository repo){
        this.repo = repo;
        try {

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            try(Connection connection = DriverManager.getConnection(url)){
                Statement statement = connection.createStatement();
                ResultSet result = statement.executeQuery("SELECT * FROM Metingen");

                while(result.next()) {
                    String id = result.getString("id");
                    String deviceId = result.getString("Deviceid");
                    String dateTime = result.getString("date");
                    String s1 = result.getString("s1");
                    String s2 = result.getString("s2");
                    String s3 = result.getString("s3");
                    String s4 = result.getString("s4");
                    String[] parts = dateTime.split("\\s");
                    String date = parts[0];
                    String time = parts[1].split("\\.", 2)[0];
                    Meting meting = new Meting(Double.parseDouble(s1),Double.parseDouble(s2), Double.parseDouble(s3),Double.parseDouble(s4),date, time, Integer.parseInt(deviceId), Integer.parseInt(id));
                    repo.add(meting);

                }
            } catch (SQLException e) {
                System.out.println("SQL exception");
                System.out.print(e.getMessage());
            }

        } catch(Exception e) {
            System.out.println("class not found");
            System.out.println(e.getMessage());
        }
    }

    public void updateRepo(MetingRepository repo) {
        this.repo = repo;
        try {

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            try (Connection connection = DriverManager.getConnection(url)) {
                Statement statement = connection.createStatement();
                ResultSet result = statement.executeQuery("SELECT * FROM Metingen");

                fillRepo(repo, result);
            } catch (SQLException e) {
                System.out.println("SQL exception");
                System.out.print(e.getMessage());
            }

        } catch (Exception e) {
            System.out.println("class not found");
            System.out.println(e.getMessage());
        }
    }

    public MetingRepository repoLatestData(){
        MetingRepository subRepo = new MetingRepository();  
        try {

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            try (Connection connection = DriverManager.getConnection(url)) {
                Statement statement = connection.createStatement();
                ResultSet result = statement.executeQuery("SELECT * FROM Metingen as T1 WHERE T1.date IN (SELECT TOP 1 T2.date FROM Metingen AS T2 WHERE T2.Deviceid = T1.Deviceid ORder By T2.date ASC )");

                fillRepo(subRepo, result);
            } catch (SQLException e) {
                System.out.println("SQL exception");
                System.out.print(e.getMessage());
            }

        } catch (Exception e) {
            System.out.println("class not found");
            System.out.println(e.getMessage());
        }
        return subRepo;
    }

    private void fillRepo(MetingRepository repo, ResultSet result) throws SQLException {
        while (result.next()) {
            String id = result.getString("id");
            String deviceId = result.getString("Deviceid");
            String dateTime = result.getString("date");
            String s1 = result.getString("s1");
            String s2 = result.getString("s2");
            String s3 = result.getString("s3");
            String s4 = result.getString("s4");
            String[] parts = dateTime.split("\\s");
            String date = parts[0];
            String time = parts[1];
            Meting meting = new Meting(Double.parseDouble(s1), Double.parseDouble(s2), Double.parseDouble(s3), Double.parseDouble(s4), date, time, Integer.parseInt(deviceId), Integer.parseInt(id));
            repo.add(meting);

        }
    }


}