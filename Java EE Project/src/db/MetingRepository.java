package db;

import domain.Meting;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;

public class MetingRepository {
    private ArrayList<Meting> metingen;
    private ArrayList<Meting> laatsteMetingen;
    public MetingRepository() {
        metingen = new ArrayList<>();
        laatsteMetingen = new ArrayList<>();
    }

    public void add(Meting meting){
        metingen.add(meting);
    }

    public ArrayList getAll(){
        return metingen;
    }

    public void addLast(Meting meting){
        laatsteMetingen.add(meting);
    }

    public ArrayList getAllLast(){
        return laatsteMetingen;
    }
    public void setLaatsteMetingen(ArrayList<Meting> laatsteMetingen){
        this.laatsteMetingen = laatsteMetingen;
    }

    public void emptyLastDataRepo(){
        laatsteMetingen = new ArrayList<>();
    }

    public ArrayList<Meting> getDayData(){
        ArrayList lastData = new ArrayList();
        DateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();

        for (Meting m: metingen) {
            if(m.getDate().equals(dateFormat2.format(date))){
                lastData.add(m);
            }
        }

        return lastData;
    }

   /* public ArrayList getLastData(){
        ArrayList lastData = new ArrayList();
        String timeSeconds = LocalTime.now().toString().split("\\.", 2)[0];
        String time = timeSeconds.substring(0, Math.min(timeSeconds.length(), 5));

        for(Meting m:getDayData()){
            String timeSecondsM = m.getTime();
            String timeM = timeSecondsM.substring(0, Math.min(timeSecondsM.length(), 5));
            ArrayList
            if (time.equals(timeM)){
                lastData.add(m);
            }
        }
        return lastData;
    }*/
}
