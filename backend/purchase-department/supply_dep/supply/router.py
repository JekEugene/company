from .viewsets import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('material', MaterialViewset)
router.register('feedstock', FeedstockViewset)

urlpatterns = router.urls
