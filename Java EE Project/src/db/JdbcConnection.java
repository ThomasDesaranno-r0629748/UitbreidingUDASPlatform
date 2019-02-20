package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.microsoft.sqlserver.jdbc.SQLServerDriver;
import domain.Meting;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;

public class JdbcConnection {
    String url = "jdbc:sqlserver://193.190.58.30;user=snuffelpaal;password=snuffelpaal";
    private MetingRepository repo = new MetingRepository();

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    Runnable drawRunnable = new Runnable() {
        public void run() {
            System.out.print(" Runned "+LocalDateTime.now());
            //repoLatestData();
        }
    };

    public JdbcConnection(MetingRepository repo){
        this.repo = repo;
        try {
            while (true) {
                repoLatestData();
                Thread.sleep(15 * 1000);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
/*
        scheduler.scheduleAtFixedRate(drawRunnable , 15, 15, TimeUnit.SECONDS);
*/
        try {
            scheduler.awaitTermination(10, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
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

    public void repoLatestData(){
        try {

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            try (Connection connection = DriverManager.getConnection(url)) {
                Statement statement = connection.createStatement();
                //ResultSet result = statement.executeQuery("SELECT * FROM Metingen as T1 WHERE T1.date IN (SELECT TOP 1 T2.date FROM Metingen AS T2 WHERE T2.Deviceid = T1.Deviceid ORDER By T2.date ASC )");

                ResultSet result = statement.executeQuery("SELECT * FROM Metingen as T1 WHERE T1.id BETWEEN (SELECT MAX(id) FROM Metingen)-1000 AND (SELECT MAX(id) FROM Metingen) AND T1.date IN (SELECT TOP 1 T2.date FROM Metingen AS T2 WHERE T2.id BETWEEN (SELECT MAX(id) FROM Metingen)-1000 AND (SELECT MAX(id) FROM Metingen) AND T2.Deviceid = T1.Deviceid ORDER By T2.date ASC )");
                fillLastRepo(repo, result);

            } catch (SQLException e) {
                System.out.println("SQL exception");
                System.out.print(e.getMessage());
            }

        } catch (Exception e) {
            System.out.println("class not found");
            System.out.println(e.getMessage());
        }
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

    private void fillLastRepo(MetingRepository repo, ResultSet result) throws SQLException {
        repo.emptyLastDataRepo();
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
            repo.addLast(meting);

        }
    }


}