class boundingBox:
    def __init__(self, l, r, t, b):
        if l < r and t < b:
            self.left = min(int(l), int(r))
            self.right = max(int(r), int(l))
            self.top = min(int(t), int(b))
            self.bottom = max(int(t), int(b))
        else:
            print("error")
        self.label = None
        self.certainty = 0

    def add_certainty(self, certainty):
        if self.certainty < certainty:
            self.certainty = certainty

    def add_label(self, label):
        self.label = label

    def get_area(self):
        return (abs(self.top - self.bottom)) * abs((self.right - self.left))

    def completely_contains(self, bbox):
        if self.left <= bbox.left and self.right >= bbox.right and self.top <= bbox.top and self.bottom >= bbox.bottom:
            return True
        else:
            return False

    def intersects(self, bbox):
        if bbox.left >= self.right or bbox.right <= self.left:
            return False
        if bbox.bottom <= self.top or bbox.top >= self.bottom:
            return False

        return True

    def get_intersection(self, bbox):
        l = max(bbox.left, self.left)
        r = min(bbox.right, self.right)
        t = min(bbox.top, self.top)
        b = max(bbox.bottom, self.bottom)
        return boundingBox(l, r, t, b)

    def get_union(self, bbox):
        l = min(bbox.left, self.left)
        r = max(bbox.right, self.right)
        t = min(bbox.top, self.top)
        b = max(bbox.bottom, self.bottom)
        return boundingBox(l, r, t, b)

    def shape(self):
        return (self.get_height(), self.get_width())

    def get_height(self):
        return self.bottom - self.top

    def get_width(self):
        return abs(self.right - self.left)

    def __str__(self):
        return " left: " + str(self.left) + " right: " + str(self.right) + " top: " + str(self.top) + " bottom: " + str(
            self.bottom) + " label: " + str(self.label) + " certainty: " + str(self.certainty)

    def dump(self):
        return {'left': self.left, 'right': self.right, 'top': self.top, 'bottom': self.bottom,'label': self.label}
