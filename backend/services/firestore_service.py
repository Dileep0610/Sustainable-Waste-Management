import firebase_admin
from firebase_admin import firestore
from datetime import datetime

class FirestoreService:
    def __init__(self):
        self._db = None
        
    @property
    def db(self):
        if not self._db:
            try:
                self._db = firestore.client()
            except Exception as e:
                print(f"Firestore initialization failed: {e}")
        return self._db
            
    def save_scan_history(self, user_id, scan_data):
        if not self.db:
            return False
            
        try:
            now = datetime.utcnow()
            doc_data = {
                "userId": user_id,
                "item": scan_data.get("item", ""),
                "category": scan_data.get("category", ""),
                "category_icon": scan_data.get("category_icon", ""),
                "is_recyclable": scan_data.get("is_recyclable", False),
                "is_hazardous": scan_data.get("is_hazardous", False),
                "is_reusable": scan_data.get("is_reusable", False),
                "full_response": scan_data.get("full_response", {}),
                "timestamp": now,
                "formatted_date": now.strftime("%b %d, %Y")
            }
            self.db.collection("scan_history").add(doc_data)
            return True
        except Exception as e:
            print(f"Failed to save history: {e}")
            return False
        
    def get_user_history(self, user_id, limit=50):
        if not self.db:
            return []
            
        try:
            docs = self.db.collection("scan_history") \
                .where(filter=firestore.FieldFilter("userId", "==", user_id)) \
                .stream()
                
            history = []
            for doc in docs:
                data = doc.to_dict()
                # Keep original timestamp for sorting
                orig_timestamp = data.get("timestamp")
                if "timestamp" in data and data["timestamp"]:
                    data["timestamp"] = data["timestamp"].isoformat() if hasattr(data["timestamp"], "isoformat") else str(data["timestamp"])
                history.append({"id": doc.id, "orig_ts": orig_timestamp, **data})
                
            # Sort in memory descending by timestamp
            history.sort(key=lambda x: x.get("orig_ts") or 0, reverse=True)
            
            # Remove orig_ts and limit
            for item in history:
                if "orig_ts" in item:
                    del item["orig_ts"]
                    
            return history[:limit]
        except Exception as e:
            print(f"Failed to retrieve history: {e}")
            return []

    def get_dashboard_stats(self, user_id):
        if not self.db:
            return None
            
        try:
            docs = self.db.collection("scan_history") \
                .where(filter=firestore.FieldFilter("userId", "==", user_id)) \
                .stream()
                
            total_scans = 0
            recyclable_count = 0
            hazardous_count = 0
            
            category_counts = {
                "Organic Waste": 0,
                "Plastic Waste": 0,
                "Paper Waste": 0,
                "Glass Waste": 0,
                "Metal Waste": 0,
                "E-waste": 0,
                "Hazardous Waste": 0,
                "General Waste": 0
            }
            
            from datetime import datetime, timedelta
            today = datetime.utcnow().date()
            weekly_trend_dict = {}
            for i in range(6, -1, -1):
                d = (today - timedelta(days=i)).isoformat()
                weekly_trend_dict[d] = 0
                
            for doc in docs:
                data = doc.to_dict()
                total_scans += 1
                
                if data.get("is_recyclable"):
                    recyclable_count += 1
                if data.get("is_hazardous"):
                    hazardous_count += 1
                    
                cat = data.get("category", "")
                if cat in category_counts:
                    category_counts[cat] += 1
                elif cat:
                    # Map common categories or fallback
                    category_counts["General Waste"] += 1
                    
                ts = data.get("timestamp")
                if ts:
                    try:
                        scan_date = ts.date() if hasattr(ts, "date") else None
                        if scan_date:
                            scan_date_iso = scan_date.isoformat()
                            if scan_date_iso in weekly_trend_dict:
                                weekly_trend_dict[scan_date_iso] += 1
                    except Exception:
                        pass

            recycle_rate = round((recyclable_count / total_scans * 100)) if total_scans > 0 else 0
            
            weekly_trend = [{"date": k, "count": v} for k, v in weekly_trend_dict.items()]
            
            return {
                "totalScans": total_scans,
                "recyclableCount": recyclable_count,
                "hazardousCount": hazardous_count,
                "recycleRate": recycle_rate,
                "categoryCounts": category_counts,
                "weeklyTrend": weekly_trend
            }
        except Exception as e:
            print(f"Failed to get dashboard stats: {e}")
            return None
