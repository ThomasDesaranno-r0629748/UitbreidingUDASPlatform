package domain;

import java.sql.Time;
import java.util.Date;

public class Meting {
    private double SO2;
    private double NO2;
    private double O3;
    private double PM10;
    private String date;
    private String time;
    private int deviceId;
    private int metingId;

    public Meting(double SO2, double NO2, double o3, double PM10, String date, String time, int deviceId, int metingId) {
        this.SO2 = SO2;
        this.NO2 = NO2;
        O3 = o3;
        this.PM10 = PM10;
        this.date = date;
        this.time = time;
        this.deviceId = deviceId;
        this.metingId = metingId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(int deviceId) {
        this.deviceId = deviceId;
    }

    public int getMetingId() {
        return metingId;
    }

    public void setMetingId(int metingId) {
        this.metingId = metingId;
    }

    public double getSO2() {
        return SO2;
    }

    public void setSO2(double SO2) {
        this.SO2 = SO2;
    }

    public double getNO2() {
        return NO2;
    }

    public void setNO2(double NO2) {
        this.NO2 = NO2;
    }

    public double getO3() {
        return O3;
    }

    public void setO3(double o3) {
        O3 = o3;
    }

    public double getPM10() {
        return PM10;
    }

    public void setPM10(double PM10) {
        this.PM10 = PM10;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
