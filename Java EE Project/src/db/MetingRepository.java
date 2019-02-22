package db;

import domain.Meting;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
       finalData.add(data.get(0));
        for (Meting m:data){
            ArrayList<Meting> gelijkeMetingen = new ArrayList<>();
            for (Meting me:data){
                if (m.getDate().equals(me.getDate()) && m.getTime().equals(me.getTime())){
                    gelijkeMetingen.add(me);
                }
            }
            if (gelijkeMetingen.size() == 0){
                System.out.print("SIZE NULL:\n");
                finalData.add(m);
            } else {
                boolean add = true;
                for (Meting met: finalData){
                    if(met.getMetingId()==gelijkeMetingen.get(0).getMetingId()) add = false;
                }
                if (add){
                    finalData.add(gelijkeMetingen.get(0));
                }
            }
        }
       return finalData;
   }

   public ArrayList<Meting> returnWeekData(){
        ArrayList<Meting> data = new ArrayList<>();
        ArrayList<Integer> ids = new ArrayList<>();
        for (Meting m:metingen){
            ids.add(m.getDeviceId());
        }
       Set<Integer> uniqueId = new HashSet<>(ids);
       SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd ");
       Calendar cal = Calendar.getInstance();
       Date date = cal.getTime();
       String[] days = new String[6];
       days[0] = sdf.format(date);

       try{
           for(int i = 1; i < 6; i++){
               cal.add(Calendar.DAY_OF_MONTH, -1);
               date = cal.getTime();
               days[i] = sdf.format(date);
           }

           for (Integer id:uniqueId){
               for (String d:days){
                   double so2 = 0;
                   double no2 = 0;
                   double o3 = 0;
                   double pm10 = 0;
                   Meting dagMeting = new Meting();
                   int amount = 0;
                   for (Meting m: metingen) {
                           if(m.getDate().trim().equals(d.trim()) && m.getDeviceId() == id){
                               amount++;
                               so2+=m.getSO2();
                               no2+=m.getNO2();
                               o3+=m.getO3();
                               pm10+=m.getPM10();
                               dagMeting = m;
                           }
                   }
                   if(amount != 0) {
                       if (Double.toString(so2 / amount).length()>5){
                           so2 = Double.parseDouble(Double.toString(so2 / amount).substring(0, 5));
                       } else so2=so2 / amount;
                       if (Double.toString(no2 / amount).length()>5){
                           no2 = Double.parseDouble(Double.toString(no2 / amount).substring(0, 5));
                       } else no2=no2 / amount;
                       if (Double.toString(o3 / amount).length()>5){
                           o3 = Double.parseDouble(Double.toString(o3 / amount).substring(0, 5));
                       } else o3=o3 / amount;
                       if (Double.toString(pm10 / amount).length()>5){
                           pm10 = Double.parseDouble(Double.toString(pm10 / amount).substring(0, 5));
                       } else pm10=pm10 / amount;

                       dagMeting.setSO2(so2);
                       dagMeting.setNO2(no2);
                       dagMeting.setO3(o3);
                       dagMeting.setPM10(pm10);
                       data.add(dagMeting);
                   }
               }
           }

       } catch (Exception e){
           System.out.print(e.getMessage()+"\n");
           System.out.print(e.getClass().toString()+"\n");
       }
       data.sort((Comparator<Meting>) (fruit2, fruit1) -> fruit2.getDate().compareTo(fruit1.getDate()));
        return data;
   }
}
