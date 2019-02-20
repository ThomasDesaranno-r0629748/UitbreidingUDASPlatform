package db;

import domain.Meting;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.*;

public class MetingRepository {
    private ArrayList<Meting> metingen;
    private ArrayList<Meting> laatsteMetingen;
    public MetingRepository() {
        metingen = new ArrayList<>();
        laatsteMetingen = new ArrayList<>();
    }

    public void setMetingen(ArrayList<Meting> metingen){
        this.metingen = metingen;
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

   public ArrayList<Meting> metingenLast24(){
       ArrayList<Meting> data = new ArrayList();


       /*DateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
       DateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");*/
       Calendar calendar = Calendar.getInstance();
       calendar.add(Calendar.HOUR_OF_DAY, -24);

       DateFormat format = new SimpleDateFormat("yyyy-MM-dd,HH:mm:ss");
       for (Meting m : metingen){
           String dateS = m.getDate() + "," + m.getTime();
           try {
               Date date = format.parse(dateS);
               if(date.after(calendar.getTime()) && m.getTime().substring(4, 6).contains("5")){
                   Meting me = m;
                   me.setTime(m.getTime().substring(0,5));
                   data.add(me);
               }
           } catch (ParseException e) {
               e.printStackTrace();
           }
       }
       data.sort((Comparator<Meting>) (fruit2, fruit1) -> fruit1.getDate().compareTo(fruit2.getDate()));
       data.sort((Comparator<Meting>) (fruit2, fruit1) -> fruit1.getTime().compareTo(fruit2.getTime()));
       ArrayList<Meting> finalData = new ArrayList<>();
        for (Meting m:data){
            ArrayList<Meting> gelijkeM = new ArrayList<>();
            double so2 = 0;
            double no2 = 0;
            double o3 = 0;
            double pm10 = 0;
            int amount = 0;
            for (Meting me:data){
                if (m.getDate().equals(me.getDate()) && m.getTime().equals(me.getTime())){
                    amount++;
                    so2 = so2 + me.getSO2();
                    no2 = no2 + me.getNO2();
                    o3 = o3 + me.getO3();
                    pm10 = pm10 + me.getPM10();
                    gelijkeM.add(me);
                }
            }
            Meting newM = gelijkeM.get(0);
            newM.setSO2(so2/amount);
            newM.setNO2(no2/amount);
            newM.setO3(o3/amount);
            newM.setPM10(pm10/amount);
            finalData.add(newM);
        }

        System.out.print("TESTTESTTESTTEST "+finalData.size());

       return finalData;
   }
}
