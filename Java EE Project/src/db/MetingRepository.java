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
       calendar.add(Calendar.HOUR_OF_DAY, -48);

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
       finalData.add(data.get(0));
        for (Meting m:data){
            ArrayList<Meting> gelijkeMetingen = new ArrayList<>();
            ArrayList<String> tijden = new ArrayList<>();
            tijden.add("test");
            double so2 = 0;
            double no2 = 0;
            double o3 = 0;
            double pm10 = 0;
            int amount = 0;
            for (Meting me:data){
                if (m.getDate().equals(me.getDate()) && m.getTime().equals(me.getTime())){
                    gelijkeMetingen.add(me);
                    /*amount++;
                    so2 = so2 + me.getSO2();
                    no2 = no2 + me.getNO2();
                    o3 = o3 + me.getO3();
                    pm10 = pm10 + me.getPM10();
                    gelijkeM.add(me);*/
                } /*else {
                    amount++;
                    //System.out.print(" date and time not equal nr "+amount+"\n" );
                    try{
                        if (finalData.size() == 0){
                            System.out.print("SIZE EMPTY\n");
                            finalData.add(me);
                        } else {
                            //System.out.print(" NOT NULL \n");
                            boolean add = false;
                            for (Meting met:finalData){
                                if (!met.getDate().equals(me.getDate()) && !met.getTime().equals(me.getTime())){
                                    add = true;
                                    ///System.out.print("ADDED\n");
                                }
                            }
                            if (add){
                                finalData.add(me);
                            }
                        }
                    } catch (Exception e){
                        System.out.print("FOUT:\n");
                        System.out.print(e.getMessage()+"\n");
                        System.out.print(e.getClass().toString()+"\n");
                    }

                }*/
            }
            if (gelijkeMetingen.size() == 0){
                System.out.print("SIZE NULL:\n");
                finalData.add(m);
            } else {
                boolean add = true;
                Meting meting = new Meting();
                for (Meting met: finalData){

                    if(met.getMetingId()==gelijkeMetingen.get(0).getMetingId()) add = false;
                    /*for(Meting gM: gelijkeMetingen){
                        //System.out.print(gM.getDeviceId()+"\n");
                        if (met.getMetingId() != gM.getMetingId() && !met.getDate().equals(gM.getDate()) && !met.getTime().equals(gM.getTime())){
                            //System.out.print("GOED\n");
                            meting = gM;
                            add = true;
                        }
                    }*/
                }
                //if (add) finalData.add(gelijkeMetingen.get(0));
                if (add){
                    finalData.add(gelijkeMetingen.get(0));
                }
            }
        }

        System.out.print("TESTTESTTESTTEST "+finalData.size());

       return finalData;
   }
}
