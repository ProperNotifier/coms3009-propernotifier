class BoundingBox:
    def __init__(self, l, r, t, b, label=None):
        self.left = min(int(l), int(r))
        self.right = max(int(r), int(l))
        self.top = min(int(t), int(b))
        self.bottom = max(int(t), int(b))
        self.label = label

    def join(self, bbox):
            left = min(self.left, bbox.left)
            right = max(self.right, bbox.right)
            top=min(self.top, bbox.top)
            bottom=max(self.bottom, bbox.bottom)
            return BoundingBox(left, right, top, bottom, self.label)

    def get_area(self):
        return (abs(self.top - self.bottom)) * abs((self.right - self.left))

    def height(self):
        return self.bottom - self.top

    def width(self):
        return abs(self.right - self.left)

    def __str__(self):
        return " left: " + str(self.left) + " right: " + str(self.right) + " top: " + str(self.top) + " bottom: " + str(
            self.bottom) + " label: " + str(self.label)

    def dump(self):
        return {'left': self.left, 'right': self.right, 'top': self.top, 'bottom': self.bottom, 'label': self.label}
